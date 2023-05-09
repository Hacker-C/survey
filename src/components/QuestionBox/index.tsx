interface QuestionBoxProps {
  isModel?: boolean
  children?: React.ReactNode
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({ isModel, children }) => {
  return <div
    bg={isModel ? 'gray-100' : ''}
    p='y3 x2'
    cursor="pointer"
  >{children}</div>
}
