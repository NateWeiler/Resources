# Prompt a user for confirmation in bash script using select

echo -e "Are You Sure?\n"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) your-action-here; break;;
        No ) exit;;
    esac
done