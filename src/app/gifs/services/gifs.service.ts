import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '7epIhLxSGBycbNSSH7oLRtH6mqWNzOuG';
  private _historial: string[]=[];
  public resultados: Gif[]=[];
  constructor(private http:HttpClient)
  {

  }
  get historial()
  {
    return [...this._historial];
  }
  buscarGifs(query:string)
  {
    if(!this._historial.includes(query.trim().toLowerCase()))
    {
      this._historial=this._historial.splice(0,10);
      this._historial.unshift(query)
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=7epIhLxSGBycbNSSH7oLRtH6mqWNzOuG&q=${query}&limit=10`)
    .subscribe( (resp)=>{
      console.log(resp);
      this.resultados = resp.data;
    });
  }


}
