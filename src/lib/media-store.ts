export interface SavedRecordingMeta {
  id: string;
  createdAt: string;
  title: string;
  mode: string;
  prompt: string;
  mimeType: string;
  size: number;
}

interface SavedRecording extends SavedRecordingMeta { blob: Blob }
const DB_NAME="ivy-english-media-v1";const STORE="recordings";
function openDb(){return new Promise<IDBDatabase>((resolve,reject)=>{const request=indexedDB.open(DB_NAME,1);request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE,{keyPath:"id"})};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
export async function saveRecording(blob:Blob,meta:{title:string;mode:string;prompt:string}){const db=await openDb();const record:SavedRecording={id:`recording-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,createdAt:new Date().toISOString(),title:meta.title,mode:meta.mode,prompt:meta.prompt,mimeType:blob.type||"audio/webm",size:blob.size,blob};await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).put(record);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close();return record.id}
export async function listRecordings(){const db=await openDb();const records=await new Promise<SavedRecording[]>((resolve,reject)=>{const tx=db.transaction(STORE,"readonly");const req=tx.objectStore(STORE).getAll();req.onsuccess=()=>resolve(req.result as SavedRecording[]);req.onerror=()=>reject(req.error)});db.close();return records.sort((a,b)=>b.createdAt.localeCompare(a.createdAt))}
export async function deleteRecording(id:string){const db=await openDb();await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)});db.close()}
