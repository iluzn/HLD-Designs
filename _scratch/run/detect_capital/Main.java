import java.util.*;

class Solution {
    public boolean detectCapitalUse(String s) {
        return s.equals(s.toUpperCase()) || s.equals(s.toLowerCase())
            || (Character.isUpperCase(s.charAt(0)) && s.substring(1).equals(s.substring(1).toLowerCase()));
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().detectCapitalUse(s)?"true":"false").append("\n");}System.out.print(sb);}}