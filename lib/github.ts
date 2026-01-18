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
    
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: contentEncoded,
      branch,
      ...(sha && { sha }),
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
  content: string
): Promise<string> {
  const path = `public/products/${productSlug}/${fileName}`;
  const message = `Add image ${fileName} for ${productSlug}`;
  
  await createOrUpdateFile(path, content, message);
  
  return `/products/${productSlug}/${fileName}`;
}

export { octokit };
