/** @jsxImportSource preact */

import { iTriggers } from "../../messagehandlers/base/iTriggers.ts";



export interface pageProps {
   triggers: iTriggers[]
}

export const Triggers = (props: pageProps) => {
   //if (props.triggers === undefined) return (<ul></ul>)
   
   return (
      <div className={"container d-flex"}>
         {props.triggers.map(trigger => (
            <div class="card me-3" style="width: 18rem;">
               <div class="card-body">
                  <h5 class="card-title">{trigger.resource}</h5>
                  <p class="card-text">
                     {trigger.actions.map(action => (
                        <span class="badge me-3 text-bg-warning">{action.toLowerCase()}</span>
                     ))}
                  </p>
               </div>
            </div>
         ))}
      </div>
   )
}