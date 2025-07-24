import { Button, Link } from '@heroui/react'
import { FaCalendarAlt, FaCalendarPlus, FaImage, FaUsers } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto pt-14 pb-10 px-6 lg:px-12">
        <section className="w-full lg:w-1/2 flex flex-col justify-center  z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Plan <span className="text-primary-600">Unforgettable</span>
            <br />
            Vacations Together
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Vacation Planner lets you organize amazing trips with friends and
            family—choose your dates, invite participants, upload memories, and
            see it all on a beautiful calendar dashboard.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-3 items-center">
              <span className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-primary-600 text-lg" />
              </span>
              <span className="font-medium text-gray-800">
                Intuitive calendar for marking vacation days
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <span className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-green-600 text-lg" />
              </span>
              <span className="font-medium text-gray-800">
                Invite and manage participants easily
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <span className="h-8 w-8 bg-pink-100 rounded-full flex items-center justify-center">
                <FaImage className="text-pink-500 text-lg" />
              </span>
              <span className="font-medium text-gray-800">
                Share and relive memories with photo uploads
              </span>
            </li>
          </ul>
          <div className="flex gap-4">
            <Button
              className="text-white font-bold px-8 py-3"
              color="primary"
              size="lg"
            >
              Get Started
            </Button>
            <Button
              className="text-primary-600 font-bold px-8 py-3"
              variant="faded"
              size="lg"
              as={Link}
              href="#how-it-works"
            >
              See How It Works
            </Button>
          </div>
        </section>
        <section className="w-full lg:w-1/2 flex items-center justify-center  mt-12 lg:mt-0 relative">
          <div className="relative w-full max-w-xl z-10">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-50 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-12 -right-16 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
            <div className="relative flex flex-col space-y-6">
              <div className="rounded-2xl bg-white shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <i className="text-primary-600 text-2xl" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-calendar-days"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="calendar-days"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                      ></path>
                    </svg>
                  </i>
                  <span className="font-semibold text-gray-800 text-lg">
                    Vacation Calendar
                  </span>
                </div>
                <div className="w-full h-40 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9c870ac40c-70636269e05ec371060d.png"
                    alt="vacation calendar ui mockup, modern, clean, colorful, dribbble style"
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-1 rounded-2xl bg-white shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="text-green-600" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-user-group"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="user-group"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
                        ></path>
                      </svg>
                    </i>
                    <span className="font-semibold text-gray-800 text-base">
                      Participants
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                      className="w-7 h-7 rounded-full border-2 border-white"
                      alt=""
                    />
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                      className="w-7 h-7 rounded-full border-2 border-white"
                      alt=""
                    />
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                      className="w-7 h-7 rounded-full border-2 border-white"
                      alt=""
                    />
                    <span className="ml-2 text-xs text-gray-500 font-medium">
                      +2 friends
                    </span>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl bg-white shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="text-pink-500" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-image"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="image"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                        ></path>
                      </svg>
                    </i>
                    <span className="font-semibold text-gray-800 text-base">
                      Photos Gallery
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a076332cbe-3faf1346f20264469e06.png"
                      className="w-10 h-10 rounded-lg object-cover"
                      alt=""
                    />
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f454cd6bec-32d93936888ed38b63eb.png"
                      className="w-10 h-10 rounded-lg object-cover"
                      alt=""
                    />
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d08aef6082-b662c34ed2fd5fcbaa1a.png"
                      className="w-10 h-10 rounded-lg object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <i className="text-primary-600 text-2xl" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-pen-to-square"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="pen-to-square"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                      ></path>
                    </svg>
                  </i>
                  <span className="font-semibold text-gray-800 text-lg">
                    Vacation Details Example
                  </span>
                </div>
                <div className="w-full h-24 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bd1b5c912a-7f4fef822b191067301d.png"
                    alt="filled vacation details form, modern, minimal, dribbble"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        id="how-it-works"
        className="max-w-7xl mx-auto py-24 px-6 lg:px-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <span className="h-14 w-14 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <FaCalendarPlus className="text-primary-600 text-3xl" />
            </span>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Plan Your Vacation
            </h3>
            <p className="text-gray-600 mb-4">
              Select your vacation days using the interactive calendar and name
              your trip.
            </p>
            <div className="w-full h-24 rounded-lg bg-gray-100 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4df6e4f623-987548834ff8c95309bb.png"
                alt="select calendar dates vacation, modern interface, ux ui, dribbble style"
              />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <span className="h-14 w-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <FaUsers className="text-green-600 text-3xl" />
            </span>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Invite Friends
            </h3>
            <p className="text-gray-600 mb-4">
              Add participants and collaborate on the details of your journey.
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt=""
              />
              <span className="ml-2 text-xs text-gray-500 font-medium">
                + others
              </span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <span className="h-14 w-14 bg-pink-50 rounded-full flex items-center justify-center mb-4">
              <FaImage className="text-pink-500 text-3xl" />
            </span>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Capture &amp; Relive Memories
            </h3>
            <p className="text-gray-600 mb-4">
              Upload photos, share experiences, and look back on your favorite
              moments together.
            </p>
            <div className="w-full h-24 rounded-lg bg-gray-100 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4063b760d7-51c228dc2b2c16445c3b.png"
                alt="vacation photo gallery ui, modern, minimal, dribbble"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <Button
            className="px-10 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg"
            color="primary"
            size="lg"
          >
            Create Your First Vacation
          </Button>
        </div>
      </section>
    </>
  )
}
