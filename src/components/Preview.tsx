import PreviewComponentProps from '../interfaces/PreviewComponentProps'
const Preview = ({ URL }: PreviewComponentProps) => {
  return (
    <>
      <div className="list flex flex-row bg-black/50 p-6 d mx-auto rounded-md items-center">
        {URL ? (
          <img
            draggable="false"
            src={URL}
            className="border-solid border-4 shadow-sm rounded-md w-[20%] h-fit bg-cover"
          ></img>
        ) : (
          ''
        )}
        {URL ? (
          <div className="p-5 text-lg text-ellipsis overflow-hidden flex flex-col justify-center">
            <p>Download link:</p>
            <a
              className="text-ellipsis overflow-hidden whitespace-nowrap text-blue-600 visited:no-underline h-fit"
              href={URL}
              target="_blank"
            >
              {URL}
            </a>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Preview
