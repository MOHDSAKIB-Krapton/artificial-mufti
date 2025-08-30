import { Components } from "react-markdown";

export const mdComponents: Components = {
  table: (props) => (
    <table className="w-full table-auto border-collapse" {...props} />
  ),
  thead: (props) => (
    <thead className="[&_th]:border-b [&_th]:font-semibold" {...props} />
  ),
  th: (props) => <th className="px-3 py-2 text-left align-top" {...props} />,
  td: (props) => <td className="px-3 py-2 align-top border-t" {...props} />,
  ul: (props) => <ul className="list-disc pl-5 my-2" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 my-2" {...props} />,

  // typed: now `inline` is recognized
  // code({ inline, children, ...props }) {
  //   return inline ? (
  //     <code
  //       className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10"
  //       {...props}
  //     >
  //       {children}
  //     </code>
  //   ) : (
  //     <code
  //       className="block p-3 rounded bg-black/10 dark:bg-white/10 whitespace-pre-wrap"
  //       {...props}
  //     >
  //       {children}
  //     </code>
  //   );
  // },
};
