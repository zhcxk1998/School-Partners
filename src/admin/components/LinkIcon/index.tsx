import React, { FC } from 'react'

interface LinkIconProps {
  icon: string,
  onClick?: () => void
}

const LinkIcon: FC<LinkIconProps> = ({ icon, onClick}) => (
  <img src={require(`@/admin/assets/img/${icon}`)} onClick={onClick} />
)

export default LinkIcon