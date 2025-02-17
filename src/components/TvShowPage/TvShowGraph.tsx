interface TvShowHeaderProps {
    tvShowId: number;
  }

export default function TvShowGraph({tvShowId} : TvShowHeaderProps){
    return(
        <div className="text-white flex flex-row h-full w-2/3 gap-x-4 items-center">
            
                    <div className="bg-green-950 w-4 h-4 rounded-full">
                        
                    </div>
                    <p>to je dobre</p>
                    
                    <div className="bg-green-500 w-4 h-4 rounded-full">
                    </div>
                    <p>git  </p>
                    
                    <div className="bg-yellow-300 w-4 h-4 rounded-full">
                    </div>
                    <p>srednie</p>
                    
                    <div className="bg-orange-400 w-4 h-4 rounded-full">
                    </div>
                    <p>ponizen sredniej</p>
                    <div className="bg-red-500 w-4 h-4 rounded-full">
                    </div>
                    <p>złe</p>
                    <div className="bg-violet-700 w-4 h-4 rounded-full">
                    </div>
                    <p>ciulowe</p>
            
            <div></div>
        </div>
    )
}