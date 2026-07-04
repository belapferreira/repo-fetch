import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface RepositoryReadmeProps {
  content: string;
  username: string;
  repository: string;
}

export const RepositoryReadme = (props: RepositoryReadmeProps) => {
  const { content, username, repository } = props;

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        img({ src, ...props }) {
          const imageSrc = src?.startsWith('http')
            ? src
            : `https://raw.githubusercontent.com/${username}/${repository}/HEAD/${src}`;

          return <img {...props} src={imageSrc} />;
        },
      }}
    >
      {content}
    </Markdown>
  );
};
