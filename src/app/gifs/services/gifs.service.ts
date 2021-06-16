import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '7epIhLxSGBycbNSSH7oLRtH6mqWNzOuG';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]=[];
  public resultados: Gif[]=[];
  constructor(private http:HttpClient)
  {
    if(localStorage.getItem('historial'))
    {
      this._historial =  JSON.parse(localStorage.getItem('historial')! );
      this.resultados =  JSON.parse(localStorage.getItem('resultados')! );

    }
  }
  get historial()
  {
    return [...this._historial];
  }
  buscarGifs(query:string)
  {
    if(!this._historial.includes(query.trim().toLowerCase()))
    {
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial))
    }
    const params = new  HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',query);
    console.log(params.toString())
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe( (resp)=>{
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados))

    });
  }


}
