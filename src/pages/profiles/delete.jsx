import db from "../../database/DexieDatabase";

export async function deleteEntries(keepIds) {


    await db.reminders
        .where('id')
        .noneOf(keepIds)
        .delete();

    console.log('Gelöscht – nur IDs 1 und 2 bleiben erhalten');
}