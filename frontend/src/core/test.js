<footer className="footer bg-info py-3">
  <span className="text-muted d-flex justify-content-center">
    @<span className="text-white  ">SAyantan</span>
  </span>
</footer>;

<div className="row text-center offset-2 ">
  {products &&
    products.map((product, index) => {
      return (
        <div key={index} className="col-3 m-3 mb-4">
          <Card />
        </div>
      );
    })}
</div>;
