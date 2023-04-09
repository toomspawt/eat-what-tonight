import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/filter/");
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Projected Page</h1>
      <form>
        <p>{res.caloriesMin}</p>
        <p>{res.caloriesMax}</p>
        <p>{res.vegan ? 'True' : 'False'}</p>
        <p>{res.alcoholFree ? 'True' : 'False'}</p>
        <p>{res.dairyFree ? 'True' : 'False'}</p>
      </form>
    </div>
  );
}

export default ProtectedPage;