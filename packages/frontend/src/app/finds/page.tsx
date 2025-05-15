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
  imageUrl: string;
  linkedStore?: StoreInfo;

  comments: CommentInfo[];
};

function Comment(props: { comment: CommentInfo }) {
  return (
    <div>
      <h1>{props.comment.authorUsername}</h1>
      <p>{props.comment.content}</p>
    </div>
  )
}

function CommentSection(props: { comments: CommentInfo[] }) {

  return (
    <div className="h-full pt-20 w-1/4">
      <h1 className="text-xl text-black dark:text-white font-medium underline">
        Comments
      </h1>

      <div className="flex flex-col gap-4">
        {props.comments.map((comment, index) => (
          <Comment comment={comment} key={index}/>
        ))}
      </div>
    </div>
  )
}

function ImageSection(props: { authorUsername: string, postImage: string }) {
  return (
    <div className="w-2/4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="rounded-full bg-gray-500 size-8" />

          <div className="text-xl font-medium">
            {props.authorUsername}
          </div>
        </div>

        <img src={props.postImage} className="min-h-full bg-gray-500" />
      </div>
    </div>
  )
}

function DescriptionSection(props: { description: string }) {
  return (
    <div className="w-1/4 h-full">
      <h1>Post Description</h1>
      <p>{props.description}</p>
    </div>
  );
}

function Post(props: { post: PostInfo }) {
  return (
    <div className="p-8 min-h-screen flex flex-col items-center">
      <div className="flex flex-row gap-8 w-full md:max-w-5xl lg:max-w-7xl xl:max-w-[1920px] bg-yellow-500">
        <CommentSection comments={props.post.comments}/>
        <ImageSection authorUsername={props.post.authorUsername} postImage={props.post.imageUrl}/>
        <DescriptionSection description={props.post.description}/>
      </div>
    </div>
  );
}

export default function Finds() {
  const templateImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Apple_Blossom_%40_Manali.jpg/960px-Apple_Blossom_%40_Manali.jpg";

  const posts: PostInfo[] = [
    { authorUsername: "test", imageUrl: templateImage, comments: [], description: "Hi" },
    { authorUsername: "foo", imageUrl: templateImage, comments: [], description: "Hello" },
    { authorUsername: "bar", imageUrl: templateImage, comments: [], description: "World" },
  ];

  return (
    <div className="flex flex-col justify-center bg-red-500 gap-4">
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;

        return (
          <div key={index}>
            <Post post={post} />
            {!isLast && <hr className="border-t border-gray-300 mt-4" />}
          </div>
        );
      })}
    </div>
  )
}
