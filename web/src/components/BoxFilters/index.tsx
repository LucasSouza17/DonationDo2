import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

interface ColorProps {
  backColorAndamento?: string;
  backColorCanceladas?: string;
  backColorFinalizadas?: string;
  lineAndamento?: string;
  lineCanceladas?: string;
  lineFinalizadas?: string;
}

const BoxFilters: React.FC<ColorProps> = ({backColorAndamento, backColorFinalizadas, backColorCanceladas, lineFinalizadas, lineAndamento, lineCanceladas}) => {
  return (
    <div className="box-filters">
    <Link to="/andamento" className="em-andamento" style={{backgroundColor: backColorAndamento, borderColor: lineAndamento}}>
      Em andamento
    </Link>
    <Link to="/canceladas" className="canceladas" style={{backgroundColor: backColorCanceladas, borderColor: lineCanceladas}}>
      Canceladas
    </Link>
    <Link to="/finalizadas" className="finalizadas" style={{backgroundColor: backColorFinalizadas, borderColor: lineFinalizadas}}>
      Finalizadas
    </Link>
  </div>
  );
}

export default BoxFilters;
