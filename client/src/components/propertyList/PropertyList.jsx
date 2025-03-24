import "./propertyList.css";
import useFetch from "../../hooks/usefetch";  // Make sure the case matches the actual file name
const PropertyList = () => {
  
  const {data, loading, error} = useFetch(
    "/hotel/countByType"
    );
    console.log(data);
    
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
  ];
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  
  return (
    <div className="pList">
      {data && data.length > 0 ? (
        images.map((img, i) => (
          <div className="pListItem" key={i}>
            <img
              src={img}
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              {data[i] && data[i].type && data[i].count >= 0 ? (
                <>
                  <h1>{data[i].type}</h1>
                  <h2>{data[i].count} {data[i].type}</h2>
                </>
              ) : (
                <div>Invalid data for this item</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};
export default PropertyList;