import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;
const branch = process.env.GITHUB_BRANCH || 'main';

export async function getFileContent(path: string): Promise<string | null> {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if ('content' in data) {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    return null;
  } catch (error) {
    console.error(`Error fetching file ${path}:`, error);
    return null;
  }
}

export async function listFiles(path: string): Promise<string[]> {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (Array.isArray(data)) {
      return data.map((item) => item.name);
    }
    return [];
  } catch (error) {
    console.error(`Error listing files in ${path}:`, error);
    return [];
  }
}

export async function createOrUpdateFile(
  path: string,
  content: string,
  message: string,
  sha?: string
) {
  try {
    const contentEncoded = Buffer.from(content).toString('base64');
    
    // If SHA is not provided, try to get it by checking if file exists
    let fileSha = sha;
    if (!fileSha) {
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path,
          ref: branch,
        });
        if ('sha' in data) {
          fileSha = data.sha;
        }
      } catch (error: any) {
        // File doesn't exist, that's fine - we'll create it
        if (error.status !== 404) {
          throw error;
        }
      }
    }
    
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: contentEncoded,
      branch,
      ...(fileSha && { sha: fileSha }),
    });

    return response.data;
  } catch (error) {
    console.error(`Error creating/updating file ${path}:`, error);
    throw error;
  }
}

export async function deleteFile(path: string, message: string) {
  try {
    // First get the file to obtain its SHA
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if ('sha' in data) {
      await octokit.repos.deleteFile({
        owner,
        repo,
        path,
        message,
        sha: data.sha,
        branch,
      });
    }
  } catch (error) {
    console.error(`Error deleting file ${path}:`, error);
    throw error;
  }
}

export async function uploadImage(
  productSlug: string,
  fileName: string,
  base64Content: string
): Promise<string> {
  try {
    const path = `public/products/${productSlug}/${fileName}`;
    const message = `Add image ${fileName} for ${productSlug}`;
    
    // Get SHA if file exists
    let fileSha: string | undefined;
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });
      if ('sha' in data) {
        fileSha = data.sha;
      }
    } catch (error: any) {
      // File doesn't exist, that's fine
      if (error.status !== 404) {
        throw error;
      }
    }
    
    // Upload directly with base64 content (don't double-encode)
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: base64Content,
      branch,
      ...(fileSha && { sha: fileSha }),
    });
    
    return `/products/${productSlug}/${fileName}`;
  } catch (error) {
    console.error(`Error uploading image ${fileName}:`, error);
    throw error;
  }
}

export { octokit };
