import { useRef } from "react"

type Eventhandler = (...args:any[])=> any

export class EventEmitter{
  private map= new Map<string,Eventhandler[]>()
  on(eventname: string, fn: Eventhandler) {
    let fnList = this.map.get(eventname)
    if(!fnList){
      this.map.set(eventname,fnList=[])
    }
    fnList.push(fn)
  }
  emit(eventname: string, ...args: any[]) {
    const fnList = this.map.get(eventname)||[]
    fnList.map((fn) => fn(...args))
  }
  off(eventname: string, fn: Eventhandler) {
    const fnList = this.map.get(eventname) || []
    if (fnList.indexOf(fn) > -1) {
      fnList.splice(fnList.indexOf(fn), 1)
    }
  }
}

export function useEventEmitter(){
  const eventhub = useRef<EventEmitter>()
  if(!eventhub.current){
    eventhub.current = new EventEmitter()
  }
  return eventhub.current
}