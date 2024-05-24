import dynamic from "next/dynamic";

const DynamicPlyrComponent = dynamic(() => import("./PlyrComponent"), {
  ssr: false,
});

export default DynamicPlyrComponent;
