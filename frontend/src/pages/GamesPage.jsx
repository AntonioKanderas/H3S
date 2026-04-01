import { useParams } from "react-router-dom";
import RoundTable from "../components/RoundTable";

export default function GamePage() {
  const { id } = useParams(); 
  return <RoundTable gameId={id} />;
}