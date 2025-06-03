import React from "react";

type CommentInfo = {
  authorUsername: string;
  content: string;
};

type StoreInfo = {
  name: string;
  description: string;
}

type PostInfo = {
  authorUsername: string;
  description: string;
  imageUrl?: string;
  linkedStore?: StoreInfo;

  comments: CommentInfo[];
};

function Comment(props: { comment: CommentInfo }) {
  return (
    <div className="bg-gray-700 p-2 md:p-4 rounded-lg">
      <h1 className="font-semibold italic">{props.comment.authorUsername}</h1>
      <p>{props.comment.content}</p>
    </div>
  )
}

function CommentSection(props: { comments: CommentInfo[] }) {

  return (
    <div className="md:w-1/4 md:h-full md:pt-20 md:gap-2 flex flex-col">
      <h1 className="md:text-xl text-black dark:text-white font-bold">
        Comments
      </h1>

      <div className="flex flex-col gap-2 md:gap-4">
        {props.comments.map((comment, index) => (
          <Comment comment={comment} key={index}/>
        ))}

        {props.comments.length === 0 && (
          <p className="italic text-gray-400">No comments yet.</p>
        )}
      </div>
    </div>
  )
}

function ImageSection(props: { authorUsername: string, postImage?: string }) {
  return (
    <div className="w-full md:w-2/4 md:p-4 rounded-lg">
      <div className="flex flex-col h-full gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="rounded-full bg-gray-500 size-8" />

          <div className="text-xl font-medium">
            {props.authorUsername}
          </div>
        </div>

        {(() => {
          if (!props.postImage) {
            return (
              <div className="h-full flex flex-col items-center justify-center rounded-lg">
                No image attached.
              </div>
            )
          }

          return (
            <img src={props.postImage} className="h-full bg-gray-500 rounded-lg" />
          )
        })()}
      </div>
    </div>
  )
}

function DescriptionSection(props: { description: string }) {
  return (
    <div className="w-full md:w-1/4 flex flex-col md:gap-2 md:h-full">
      <h1 className="font-bold md:text-lg">Description</h1>
      <p className="bg-gray-700 p-1 md:p-2 rounded-lg h-32 md:min-h-1/2">
        {props.description}
      </p>
    </div>
  );
}

function Post(props: { post: PostInfo }) {
  return (
    <div className="px-1 md:p-8 md:h-[640px] flex flex-col items-center">
      <div className="hidden md:flex flex-row gap-8 h-full w-full rounded-lg p-2 py-4 md:max-w-5xl md:max-w-7xl xl:max-w-[1920px]">
        <CommentSection comments={props.post.comments}/>
        <ImageSection authorUsername={props.post.authorUsername} postImage={props.post.imageUrl}/>
        <DescriptionSection description={props.post.description}/>
      </div>

      <div className="flex md:hidden flex-col w-full">
        <ImageSection authorUsername={props.post.authorUsername} postImage={props.post.imageUrl} />
        <DescriptionSection description={props.post.description} />
        <CommentSection comments={props.post.comments} />
      </div>
    </div>
  );
}

export default function Finds() {
  const templateImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Apple_Blossom_%40_Manali.jpg/960px-Apple_Blossom_%40_Manali.jpg";

  const posts: PostInfo[] = [
    { authorUsername: "test", imageUrl: templateImage, comments: [
      {
        authorUsername: "foo",
        content: "This is a comment on the post.",
      }
    ], description: "Hi" },
    { authorUsername: "foo", imageUrl: templateImage, comments: [], description: "Hello" },
    { authorUsername: "bar", comments: [], description: "World" },
  ];

  return (
    <div className="flex flex-col justify-center">
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;

        return (
          <div key={index}>
            <Post post={post} />
            {!isLast && <hr className="border-t border-gray-300 my-8 md:my-0" />}
          </div>
        );
      })}
    </div>
  )
}
