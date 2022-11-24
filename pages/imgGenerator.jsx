const imgGenerator = () => {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-3/5">
        <iframe
          className="iframe"
          title="stableDiffusion"
          frameBorder="0"
          width="100%"
          height="650px"
          src="https://inpainter.dailydisco.repl.co/paint?embed=true"
        />
      </div>
    </div>
  );
};

export default imgGenerator;
