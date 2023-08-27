import './App.css'
import Nav from "./Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Table from "./Table";
import TableInput from "./TableInput";
import Update from "./Update";
import Home from "./Home";


export default function App() {
  return (
    <main>
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/TableInput" element={<TableInput/>} />
        <Route path="/Table" element={<Table/>} />
        <Route path="/Update/:index" element={<Update/>} />
          </Routes>
        </BrowserRouter>
    </main>
  )
}