import { IAdminTableItem } from './admin-table.interface'
import { FC } from 'react'

import styles from './AdminTable.module.scss'
import AdminActions from './AdminAction/AdminActions'


const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				editUrl={tableItem.editUrl}
				removeHandler={() => removeHandler(tableItem._id)}
			/>
		</div>
	)
}

export default AdminTableItem
