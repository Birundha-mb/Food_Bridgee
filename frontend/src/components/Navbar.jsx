import {
  Bell,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import socket from "../services/socket";

export default function Navbar() {

  const [notifications,
    setNotifications] =
    useState([]);

  const [showBox,
    setShowBox] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    socket.on(
      "notification",
      (data) => {

        setNotifications(
          (prev) => [
            data,
            ...prev,
          ]
        );

      }
    );

    return () => {

      socket.off(
        "notification"
      );

    };

  }, []);

  return (

    <div className="bg-white rounded-3xl shadow-lg px-8 py-5 flex justify-between items-center relative">

      <div>

        <h1 className="text-3xl font-bold">

          Welcome,
          {" "}
          {user?.name}

        </h1>

        <p className="text-gray-500 mt-1">

          {user?.role}

        </p>

      </div>

      <div className="relative">

        <button
          onClick={() =>
            setShowBox(
              !showBox
            )
          }
          className="relative"
        >

          <Bell
            size={30}
            className="text-gray-700"
          />

          {notifications.length >
            0 && (

            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">

              {
                notifications.length
              }

            </div>

          )}

        </button>

        {showBox && (

          <div className="absolute right-0 mt-5 bg-white shadow-2xl rounded-2xl w-[350px] p-5 z-50">

            <h2 className="text-2xl font-bold mb-4">

              Notifications

            </h2>

            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">

              {notifications.length ===
              0 ? (

                <p className="text-gray-500">

                  No notifications

                </p>

              ) : (

                notifications.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="bg-slate-100 p-4 rounded-xl"
                    >

                      <p className="font-semibold">

                        {
                          item.message
                        }

                      </p>

                      <p className="text-xs text-gray-500 mt-1">

                        {
                          item.time
                        }

                      </p>

                    </div>

                  )
                )

              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}