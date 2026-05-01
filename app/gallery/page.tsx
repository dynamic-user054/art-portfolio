import { NavBar } from "@/components/NavBar";

export const gallery = () => {


  const photos =[]
  return (
    <div className="flex flex col">
    <NavBar/>
    <div>Gallery</div>
    <div className="flex flex-col justify-evenly">
      {/* {photos.map((photo ,i)=>(
        <div key={i}  className="p-10">
          <img src={photo}/>
        </div>
      ))} */}
      </div>
      </div>
  );
}
export default gallery;
