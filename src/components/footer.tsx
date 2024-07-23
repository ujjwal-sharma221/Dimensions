const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t-[1px] border-black text-sm">
      <div className="m-4 flex justify-between">
        <div>
          <div>Dimension.inc</div>
          <div>All rights reserverd</div>
        </div>
        <div className="flex w-1/2 justify-between gap-4">
          <div>
            1234 Imaginary Lane Suite 0 <br />
            Middle of Nowhere, ZZ 00000 <br /> Planet Earth
          </div>
          <div>
            <div> Privacy Policy and Cookies Statements</div>{" "}
            <div> Website Terms of Use</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
