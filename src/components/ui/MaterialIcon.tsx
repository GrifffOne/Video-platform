import { useRenderClient } from '@/hooks/useRenderClient'
import { TypeMaterialIconName } from '@/shared/types/icon.types'
import { FC } from 'react'

import * as MaterialIcons from 'react-icons/md'


const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
	const { isRenderClient } = useRenderClient()

	const IconComponent = MaterialIcons[name]

	if (isRenderClient)
		return <IconComponent /> || <MaterialIcons.MdDragIndicator />
	else return null
}

export default MaterialIcon
