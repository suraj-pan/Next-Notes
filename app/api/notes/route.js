 let notes = [{id:1,note:"learn rajasthan GK"}];

export  function GET(){
    return Response.json(notes);
}

export async function  POST(req){
    const body = await req.json()
    console.log(body)
    const newNote = {id:Date.now(),note:body}
    notes.push(newNote)
    return Response.json(newNote);
}

export async function DELETE(req){
    const body = await req.json()
    console.log(body)
    notes = notes.filter((note) => note.id != body)
    return Response.json(notes);
}