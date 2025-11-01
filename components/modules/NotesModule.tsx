
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDatabase } from '../../hooks/useDatabase';
import { Note } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

const NotesModule: React.FC = () => {
    const { user } = useAuth();
    // The database path is constructed based on the logged-in user's UID.
    // This ensures data is securely stored per-user.
    const dbPath = user ? `users/${user.uid}/notes` : null;
    const { data: notes, loading, add, remove } = useDatabase<Note>(dbPath);
    const [newNote, setNewNote] = useState('');

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newNote.trim()) {
            await add({
                text: newNote.trim(),
                createdAt: Date.now(),
            });
            setNewNote('');
        }
    };

    const sortedNotes = notes ? [...notes].sort((a, b) => b.createdAt - a.createdAt) : [];

    return (
        <div>
            <h1 className="text-3xl font-thin mb-6">Notes</h1>
            <Card>
                <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-2">
                    <Input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="What's on your mind?"
                        className="flex-grow"
                    />
                    <Button type="submit" disabled={loading || !newNote.trim()}>
                        Add Note
                    </Button>
                </form>
            </Card>

            <div className="mt-6">
                {loading && !notes && <p className="text-gray-500 dark:text-gray-400">Loading notes...</p>}
                {!loading && notes?.length === 0 && <p className="text-gray-500 dark:text-gray-400">No notes yet. Add one above!</p>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedNotes.map((note) => (
                        <Card key={note.id} className="flex flex-col justify-between">
                            <p className="flex-grow mb-4 whitespace-pre-wrap">{note.text}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                               <span>{new Date(note.createdAt).toLocaleString()}</span>
                                <button
                                    onClick={() => remove(note.id)}
                                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    aria-label="Delete note"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotesModule;
