import java.util.*;

class Solution {
    public String removeStars(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '*') sb.deleteCharAt(sb.length() - 1);
            else sb.append(c);
        }
        return sb.toString();
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().removeStars(s)).append("\n");}System.out.print(sb);}}