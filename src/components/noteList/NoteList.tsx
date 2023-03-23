import { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

type NoteColor = "pink" | "darkBlue" | "lightBlue" | "orange" | "purple";
export interface Note {
  uuid: string;
  title: string;
  content: string;
  color: NoteColor;
}

interface Props {
  notes: Note[];
}

const NoteColors = {
  pink: "bg-notes-pink",
  darkBlue: "bg-notes-darkBlue",
  lightBlue: "bg-notes-lightBlue",
  orange: "bg-notes-orange",
  purple: "bg-notes-purple",
};

export default function NoteList(props: Props) {
  const [notes, setNotes] = useState(props.notes);
  const [showTrashcan, setShowTrashcan] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [readyToDelete, setReadyToDelete] = useState<boolean>(false);

  const handleDrag: ReactGridLayout.ItemCallback = (
    layout,
    oldItem,
    newItem,
    placeholder,
    event,
    element
  ) => {
    const trashcan = document.querySelector(".trashcan");
    if (!trashcan) {
      return;
    }
    const trashcanRect = trashcan.getBoundingClientRect();
    const draggedItemRect = element.getBoundingClientRect();

    if (
      draggedItemRect.right > trashcanRect.left &&
      draggedItemRect.left < trashcanRect.right &&
      draggedItemRect.bottom > trashcanRect.top &&
      draggedItemRect.top < trashcanRect.bottom
    ) {
      setReadyToDelete(true);
    } else {
      setReadyToDelete(false);
    }
  };

  const handleDragStart: ReactGridLayout.ItemCallback = (
    layout,
    oldItem,
    newItem,
    placeholder,
    event,
    element
  ) => {
    setShowTrashcan(true);
    setSelectedNote(element.getAttribute("id"));
  };

  const handleDragStop: ReactGridLayout.ItemCallback = (
    layout,
    oldItem,
    newItem,
    placeholder,
    event,
    element
  ) => {
    const trashcan = document.querySelector(".trashcan");
    if (!trashcan) {
      return;
    }
    const trashcanRect = trashcan.getBoundingClientRect();
    const draggedItemRect = element.getBoundingClientRect();

    if (
      draggedItemRect.right > trashcanRect.left &&
      draggedItemRect.left < trashcanRect.right &&
      draggedItemRect.bottom > trashcanRect.top &&
      draggedItemRect.top < trashcanRect.bottom
    ) {
      const newNotes = notes.filter((note) => note.uuid !== newItem.i);
      setNotes(newNotes);
    }
    setShowTrashcan(false);
    setSelectedNote(null);
  };

  function calculateNoteHeight(note: Note) {
    const charsPerLine = 15;
    const lineHeight = 20;
    const padding = 100;

    const lines = Math.ceil(note.content.length / charsPerLine);
    const heightInPixels = lines * lineHeight + padding;

    return heightInPixels;
  }

  const generateLayouts = () => {
    return notes?.map((note, index) => {
      const heightInPixels = calculateNoteHeight(note);
      const heightInGridUnits = Math.ceil(heightInPixels / 80);
      return {
        i: note.uuid,
        x: index % 8,
        y: Math.floor(index / 8) * 2,
        w: 1,
        h: heightInGridUnits,
      };
    });
  };

  const layouts = {
    lg: generateLayouts(),
  };

  const generateItem = (note: Note) => {
    const backgroundColor = NoteColors[note.color];
    return (
      <div
        key={note.uuid}
        className={`${backgroundColor} p-4 rounded-xl shadow-md drop-shadow-xl ${
          showTrashcan && selectedNote === note.uuid ? "z-40" : "z-10"
        } ${
          showTrashcan && selectedNote === note.uuid && readyToDelete
            ? "border-red border-2 filter blur-sm"
            : ""
        } `}
        data-grid={{ ...layouts.lg.find((item) => item.i === note.uuid) }}
        id={note.uuid}
      >
        <div id={note.uuid} className="text-white font-bold">
          {note.title}
        </div>
        <div id={note.uuid} className="text-white">
          {note.content}
        </div>
      </div>
    );
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layouts.lg }}
        rowHeight={80}
        cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 2 }}
        autoSize={true}
        margin={[20, 25]}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        onDrag={handleDrag}
      >
        {notes?.map(generateItem)}
      </ResponsiveGridLayout>

      <div className="fixed bottom-10 z-20 left-0 right-0 flex justify-center">
        {showTrashcan && (
          <div className="text-white bg-purple w-16 h-16 rounded-full flex justify-center items-center drop-shadow-2xl trashcan">
            T
          </div>
        )}
        {!showTrashcan && (
          <div className="text-3xl text-white bg-purple w-16 h-16 rounded-full flex justify-center items-center drop-shadow-2xl">
            +
          </div>
        )}
      </div>
    </>
  );
}
