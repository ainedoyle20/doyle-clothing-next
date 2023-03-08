import { Oval } from "react-loader-spinner";

interface ILoaderProps {
  inContainer: boolean;
}

const Loader = ({ inContainer }: ILoaderProps) => {
  return (
    <div className={`${inContainer ? "w-full h-full" : "w-screen h-screen"} flex justify-center items-center`}>
      <Oval
        height={50}
        width={50}
        color="#000000"
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#000000"
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
    </div>
  );
}

export default Loader;
