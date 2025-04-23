"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="p-6 text-center text-red-500 flex flex-col gap-2 items-center justify-center h-screen w-full">
      <h2 className="text-xl">Oops! Something went wrong.</h2>
      <p>{error.message}</p>
    </div>
  );
}
