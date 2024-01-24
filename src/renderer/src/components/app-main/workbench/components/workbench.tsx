import { useMemo } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";

import { HeadBar } from "./head-bar";
import { ImageItem } from "./image-item";
import { Empty } from "./empty";
import { useAtomValue } from "jotai";
import { currentWksIDAtom } from "~/atoms/workspaces";
import { tasksAtom } from "~/atoms/tasks";
import { useAddFiles } from "~/hooks/use-add-files";

export function Workbench() {
  const currentWorkspaceId = useAtomValue(currentWksIDAtom);
  const tasks = useAtomValue(tasksAtom);

  const list = useMemo(() => {
    if (currentWorkspaceId) {
      return tasks.get(currentWorkspaceId) || [];
    }
    return [];
  }, [tasks, currentWorkspaceId]);

  const { handleDrop } = useAddFiles();

  return (
    <section className="flex flex-col h-full">
      <HeadBar />
      <ScrollArea
        className="h-full"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="space-y-2 p-4">
          {list.length === 0 ? (
            <Empty />
          ) : (
            list.map((item) => (
              <ImageItem key={item.filepath} filepath={item.filepath} />
            ))
          )}
        </div>
      </ScrollArea>
    </section>
  );
}
