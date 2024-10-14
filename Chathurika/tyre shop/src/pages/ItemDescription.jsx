function ItemDescription() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  return (
    <div>
      <div className="flex justify-center gap-10 align-middle border border-1 p-10">
        <div className="flex-1 flex justify-end">
          <img
            src={product.imageUrl}
            alt={product.model}
            className="w-full h-fit"
          />
        </div>
        <div className="flex-1 font-bold">
          <h1 className="mb-5 text-3xl">
            {product.brand}
            <span className="pl-5 ">{product.model}</span>
          </h1>
          <h3 className="pb-4 text-3xl">
            Rs. {Number(product.price).toLocaleString()}
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            beatae ex iusto aspernatur, cupiditate impedit facilis recusandae
            illo incidunt dolor ducimus, quidem asperiores distinctio corrupti
            iure, facere tempore pariatur vero! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Architecto beatae ex iusto aspernatur,
            cupiditate impedit facilis recusandae illo incidunt dolor ducimus,
            quidem asperiores distinctio corrupti iure, facere tempore pariatur
            vero! Lorem ipsum dolor sit amet consectetur adipisicing elit. iure,
            facere tempore pariatur vero! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Architecto beatae ex iusto aspernatur, cupiditate
            impedit facilis recusandae illo incidunt dolor ducimus, quidem
            asperiores distinctio corrupti iure, facere tempore pariatur vero!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            beatae ex iusto aspernatur, cupiditate impedit facilis recusandae
            illo incidunt dolor ducimus, quidem asperiores distinctio corrupti
            iure, facere tempore pariatur vero! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Architecto beatae ex iusto aspernatur,
            cupiditate impedit facilis recusandae illo incidunt dolor ducimus,
            quidem asperiores distinctio corrupti iure, facere tempore pariatur
            vero! corrupti iure, facere tempore pariatur vero! Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Architecto beatae ex iusto
            aspernatur, cupiditate impedit facilis recusandae illo incidunt
            dolor ducimus, quidem asperiores distinctio corrupti iure, facere
            tempore pariatur vero!
          </p>
          itate impedit facilis recusandae illo incidunt dolor ducimus, quidem
          asperiores distinctio corrupti iure, facere tempore pariatur vero!
          <button className="bg-[#ff0000] text-white pl-3 pr-3 pt-1 pb-1 w-full ml-0 m-4 hover:bg-[#ff1010]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDescription;
