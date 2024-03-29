import React from "react";
import Context from "@/components/processing_functions/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
// import { totalwork } from "@/components/processing_functions/progress";

import { useContext } from "react";

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const All_chats = () => {
  const { message, setMessage } = useContext(Context);
  const { data: sessionData } = useSession();
  const isLoggedIn = sessionData?.user;

  const { data, error, isLoading } = useSWR(
    isLoggedIn?._id
      ? `/api/userchats/getAllchats?user_id=${isLoggedIn?._id}`
      : null,
    fetcher
  );

 

  return (
    <>
      <div className="mychats">
        <h2>All chats</h2>
        {error ?  <> <h3>No Chats</h3></> :null }
        {data?.map((obj) => {
          return (
            <>
              <Link href={`/users/chat/${obj?.ad_id?._id}`}>
                <div className="single_chat_div">
                  <p className="owner">Owner : {obj?.buyer_id?.name}</p>
                  <p className="buyer">Buyer : {obj?.seller_id?.name}</p>
                  <p className="carname">
                    {obj?.ad_id?.brand} {obj?.ad_id?.model}
                  </p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default All_chats;
