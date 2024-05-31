const MovieCardModal = () => (
  <div onClick={() => {}} className="modal-box bg-green-100 shadow-xl mx-6 p-0">
    <img
      src={
        "https://media.21cineplex.com/webcontent/gallery/pictures/1715859109228_290x426.jpg"
      }
      alt={"Test"}
      className="aspect-square object-cover bg-gray-400 rounded-t-2xl w-full"
      height={78}
    />
    <div className="card-body">
      <h2 className="card-title">{"Test"}</h2>
      <p>{"-"}</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Fashion</div>
        <div className="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
);

export default MovieCardModal;
