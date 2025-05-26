import Header from "@/components/header/Header";
import Invoice from "@/components/invoice/Invoice";
import Authuserverify from "@/components/shared/Authuserverify";
import React from "react";

export default function page() {
  return (
    <>
      <Authuserverify>
        <Header />
        <Invoice />
      </Authuserverify>
    </>
  );
}
