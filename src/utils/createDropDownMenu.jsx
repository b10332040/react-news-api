import { DropDownMenu } from "/components"

/**
 * 產生下拉選單
 * @param {object} obj - 物件
 * @param {string} obj.menuId - menu ID
 * @param {bool} obj.open - menu 是否打開
 * @param {func} obj.setOpen - 設定 menu 是否打開
 * @param {string} obj.openButtonMode - 打開按鈕模式
 * @param {string} obj.openButtonTitle - 打開按鈕 title 屬性值
 * @param {bool} obj.openButtonDisabled - 打開按鈕 disabled 屬性值
 * @param {node} obj.openButtonChildren - 打開按鈕的內容
 * @param {node} obj.menuChildren - 選單的內容
 * @returns 
 */
const createDropDownMenu = ({
  menuId,
  open,
  setOpen,
  openButtonMode='light',
  openButtonTitle='', 
  openButtonDisabled=false,
  openButtonChildren,
  menuChildren
}) => {
    return (
      <DropDownMenu
        menuId={menuId}
        open={open}
        setOpen={setOpen}
      >
        <DropDownMenu.OpenButton
          mode={openButtonMode}
          title={openButtonTitle}
          disabled={openButtonDisabled}
        >
          { openButtonChildren }
        </DropDownMenu.OpenButton>
        <DropDownMenu.Menu>
          { menuChildren }
        </DropDownMenu.Menu>
      </DropDownMenu>
    )
  }

  export default createDropDownMenu