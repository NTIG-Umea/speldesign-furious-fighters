
export default function onEvent (initialTime, text, formatTime)
{
    initialTime -= 1;
    text.setText('Time remaining: ' + formatTime(initialTime));
}