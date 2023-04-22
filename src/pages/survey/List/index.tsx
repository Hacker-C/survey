export function SurveyList() {
  return (
    <>
      <h2>Survey List</h2>
      {
        Array.from({ length: 50 }).map((_, index) => (
          <div key={index}>
            <h3>Survey {index}</h3>
          </div>
        ))
      }
    </>
  )
}
