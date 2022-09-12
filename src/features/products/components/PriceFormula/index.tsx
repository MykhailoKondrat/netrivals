import {
  FC,
  ReactElement,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import { useAppDispatch } from "../../../../app/store";
import {
  FORMULA_ACTIONS,
  FormulaActions,
  setFormula,
} from "../../productSlice";
import { FaDivide, FaPlus, FaMinus, FaTimes, FaEdit } from "react-icons/fa";
import { ControlsWrap, InputsWrap, PriceFormulaWrap } from "./styles";

interface PriceFormulaEditorProps {
  id: number;
  action: FormulaActions;
  value: number;
  initialPrice: number;
}
const MAX_VALUE = 1000000;
const STEP = 0.001;

const actionToIconMap: Record<FormulaActions, any> = {
  add: <FaPlus />,
  deduct: <FaMinus />,
  divide: <FaDivide />,
  multiply: <FaTimes />,
  [""]: "",
};

export const PriceFormulaEditor: FC<PriceFormulaEditorProps> = ({
  id,
  action,
  value,
  initialPrice,
}) => {
  console.log(value);
  const [editModeOn, setEditModeOn] = useState(false);
  const [selectedAction, setSelectedAction] = useState(action);
  const [inputValue, setInputValue] = useState(value ? value.toString() : "");
  const [inputError, setInputError] = useState<string>("");
  const dispatch = useAppDispatch();
  const maxValue = action === "deduct" ? value - STEP : MAX_VALUE;

  const handleToggleEditMode = () => {
    setEditModeOn((prev) => !prev);
  };
  const validateInput = (): string => {
    if (parseFloat(inputValue) === 0 && selectedAction !== "") {
      return "Value can't be zero";
    }
    if (selectedAction === "deduct" && parseFloat(inputValue) > initialPrice) {
      return "Result can't be less then 0";
    }
    return "";
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormulaSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAction(e.target.value as FormulaActions);
  };

  const handleSaveFormula = () => {
    dispatch(
      setFormula({
        action: selectedAction,
        id: id,
        value: parseFloat(inputValue),
      })
    );
    handleToggleEditMode();
  };
  const handleCancel = () => {
    handleToggleEditMode();
    setInputValue(value ? value.toString() : "");
    setSelectedAction(action);
  };
  useEffect(() => {
    setInputError(validateInput());
  }, [selectedAction, inputValue]);

  const formulaIsSet = selectedAction !== "" && parseFloat(inputValue) !== 0;

  return (
    <PriceFormulaWrap id={`${id}-price-formula-form`}>
      {formulaIsSet ? (
        <p>
          {actionToIconMap[selectedAction]}
          {inputValue}
        </p>
      ) : (
        <p>
          <i>Set new price formula</i>
        </p>
      )}
      {editModeOn && (
        <InputsWrap>
          <select
            name="actions"
            id="actions"
            defaultValue={action}
            onChange={handleFormulaSelection}
          >
            {FORMULA_ACTIONS.map((availableAction) => (
              <option key={availableAction || "none"} value={availableAction}>
                {availableAction || "none"}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={0}
            max={maxValue}
            step={STEP}
            onChange={handleInputChange}
            value={inputValue}
            required
          />
        </InputsWrap>
      )}
      <ControlsWrap>
        {editModeOn && (
          <>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSaveFormula();
              }}
              disabled={inputError.length !== 0}
            >
              Save
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
        {!editModeOn && (
          <button onClick={handleToggleEditMode}>
            <FaEdit />
          </button>
        )}
      </ControlsWrap>
      {inputError && <p>{inputError}</p>}
    </PriceFormulaWrap>
  );
};

export default PriceFormulaEditor;
