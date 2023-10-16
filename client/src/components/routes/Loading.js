import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingGif from "../../images/loading.gif";

export default function Loading() {
  // state
  const [count, setCount] = useState(3);
  //hooks
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/login");

    // cleanup
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={LoadingGif} alt="loading" style={{ width: "500px" }} />
    </div>
  );
}
