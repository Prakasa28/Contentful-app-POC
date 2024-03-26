import React from "react";

const DynamicContentRenderer = ({ post }) => {
  const { title, coverImage, date, author, content } = post.fields;

  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <p>Author: {author}</p>
      {renderImage(coverImage)}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* Add rendering logic for other field types */}
    </div>
  );
};

const renderImage = (image) => {
  if (image.sys.linkType === "Asset" && image.sys.type === "Link") {
    return <img src={image.fields.file.url} alt={image.fields.description} />;
  }
  // Handle other Link types or provide a fallback
  return <p>Unsupported image format</p>;
};

export default DynamicContentRenderer;

<div>
  <h1>Blog Post</h1>
  {post ? <DynamicContentRenderer post={post} /> : <p>Loading content...</p>}
</div>;
