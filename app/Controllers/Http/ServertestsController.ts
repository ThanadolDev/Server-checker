import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import axios from "axios";

export default class ServertestsController {

 

    async index({ view }) {
        return view.render('index')
      }
    
      async status({ response }) {
        const urls = [
          'http://127.0.0.1:3333/', // Change these URLs to the paths you want to check
          'https://chat.openai.com/',
          'https://example.com/path3'
        ]
        
        const results = await Promise.all(
          urls.map(async (url) => {
            try {
              const response = await axios.get(url)
              return { url, status: response.status }
            } catch (error) {
              return { url, status: 500 }
            }
          })
        )
        
        const dotColors = results.map(result => ({
          url: result.url,
          color: result.status === 200 ? 'green' : 'red'
        }))
        
        return response.json(dotColors)
      }
}
