'use client'
import {useEffect, useState} from "react";

export  default  function Page (){

    const [notes, setNotes] = useState([]);
    const [text, setText] = useState('');
    const getData = async () => {
    const response = await fetch("/api/notes")
    const data = await response.json();
    console.log(data);
    setNotes(data);
}


const addNote =  async () => {

    if(text.trim().length === 0) return
    console.log(text)
    const response = await fetch("/api/notes", {method: "POST",
        body: JSON.stringify(text),
        headers: {"Content-Type": "application/json"}});

    const data = await response.json();
    console.log(data);
    setNotes([...notes,data]);
    setText('')
}

const deleteNote =  async (id) => {
    const response = await fetch("/api/notes", {method: "DELETE",
        body: JSON.stringify(id),
    headers: {"Content-Type": "application/json"}});
    const data = await response.json();
    // console.log(data);
    setNotes(data);
}


useEffect(()=>{
    getData();
},[])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-50 p-6 flex flex-col items-center">
            {/* App Header */}
            <h1 className="text-4xl font-bold text-indigo-700 mb-6 tracking-tight">
                📝 My Smart Notes
            </h1>

            {/* Add Note Section */}
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-5 mb-8 border border-gray-100">
                <div className="flex gap-3">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a note..."
                        className="flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl px-4 py-2 text-gray-800"
                    />
                    <button
                        onClick={addNote}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl shadow transition-all"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Notes List */}
            <div className="w-full max-w-lg space-y-3">
                {notes.length === 0 ? (
                    <p className="text-gray-500 text-center italic">No notes yet — add one!</p>
                ) : (
                    notes.map((note, index) => (
                        <div
                            key={note.id}
                            className="flex justify-between items-center bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 px-5 py-3 transition-all duration-200"
                        >
                            <div className="text-gray-800 font-medium">{note.note}</div>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <footer className="mt-10 text-gray-500 text-sm">
                Made with ❤️ using <span className="text-indigo-600 font-semibold">Next.js  by Suraj Pandey</span> +{" "}
                <span className="text-cyan-500 font-semibold">Tailwind CSS</span>
            </footer>
        </div>
    )
}