
export const gallery = () => {


  const photos =["https://imgs.search.brave.com/l4cjMLhZH2M1CGlpApdMbD0cwFwD5OB_wPwpy68MPnM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iZWF1/dGlmdWwtbmF0dXJl/LXBob3RvLTQxOTYx/MDA0NS5qcGc"];
  return (
    <div className="flex flex col">
    <div>Gallery</div>
    <div className="flex flex-col justify-evenly">
      {photos.map((photo ,i)=>(
        <div key={i}  className="p-10">
          <img src={photo}/>
        </div>
      ))}
      </div>
      </div>
  );
}
export default gallery;
