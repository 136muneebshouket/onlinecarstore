import React, { useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import FullLoader from "@/components/Modals/Loader/FullLoader";
import Context from "@/components/processing_functions/context";

const fetcher = (url) => axios.get(url).then((res) => res.data.payload);
const ALL_members = () => {
  const { message, setMessage } = useContext(Context);
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/team/all_members`,
    fetcher
  );

  async function del(id) {
    setMessage({ loader: true });
    let admin_token = JSON.parse(localStorage.getItem("admin_token"));
    await axios
      .post("/api/admin/team/delete_member", { id, admin_token })
      .then((result) => {
        setMessage({ loader: false });
        setMessage({ success: true, msg: result.data.message });
        mutate()
      })
      .catch((err) => {
        setMessage({ loader: false });
        setMessage({ success: false, msg: err?.response?.data.message });
      });
  }
  //   console.log(data)

  return (
    <>
      {isLoading ? <FullLoader /> : null}

      <div className="members">
        <h2>My Team Members</h2>

        {error ? (
          <>
            <h2 style={{ color: "red", textAlign: "center" }}>
              Something wrong
            </h2>
          </>
        ) : null}

        {data
          ? data.map((obj, index) => {
              return (
                <>
                  <div
                    style={{ background: "white" }}
                    className="fetched_member"
                  >
                    <div style={{ background: "white" }} className="card">
                      {obj?.member.avatar ? (
                        <img src={obj?.member.avatar} alt="avatar" />
                      ) : null}

                      <div className="">
                        <p>{obj?.member.name}</p>
                        <p>{obj?.member.email}</p>
                      </div>
                    </div>
                    <div className="roles">
                      {obj.role.map((v) => {
                        return (
                          <>
                            <span>{v}</span>
                          </>
                        );
                      })}
                    </div>
                    <div className="del">
                      <button
                        onClick={() => {
                          del(obj?._id);
                        }}
                      >
                        {" "}
                        delete{" "}
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          : null}
      </div>
    </>
  );
};

export default ALL_members;
