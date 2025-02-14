export default function FooterComponent(){
    return(
        <div className="flex flex-row bg-black text-blue-600 justify-center p-8 gap-x-4 underline"> 
            <a href="">All Shows </a>
            <p className="text-gray-500">|</p>
            <a href=""> Privacy Policy</a>
            <p className="text-gray-500">|</p>
            <a href="">Contact us</a>
        </div>
    )
}